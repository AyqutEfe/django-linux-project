"""
Long-lived TCP (WebSocket) Ping-Pong Sunucusu
-----------------------------------------------
Bu uygulama, Istio'nun long-lived TCP bağlantılarını idle-timeout
olmadan yönetip yönetemediğini test etmek amacıyla geliştirilmiştir.

İstemci belirli aralıklarla "ping" mesajı gönderir, sunucu "pong" ile
cevap verir ve bağlantının ne kadar süredir açık olduğunu loglar.
"""

import asyncio
import json
import logging
import os
import time
from datetime import datetime, timezone

import websockets
from websockets.server import WebSocketServerProtocol

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("ping-pong-server")

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8765"))

# Aktif bağlantıları takip etmek için (id -> baglanti_zamani)
active_connections: dict[str, float] = {}


async def handler(websocket: WebSocketServerProtocol):
    client_id = f"{websocket.remote_address[0]}:{websocket.remote_address[1]}"
    connected_at = time.monotonic()
    active_connections[client_id] = connected_at

    logger.info(f"[BAĞLANDI] {client_id} | Aktif bağlantı sayısı: {len(active_connections)}")

    try:
        async for message in websocket:
            elapsed = time.monotonic() - connected_at

            try:
                data = json.loads(message)
                msg_type = data.get("type", "unknown")
            except (json.JSONDecodeError, TypeError):
                msg_type = message

            if msg_type == "ping":
                response = {
                    "type": "pong",
                    "server_time": datetime.now(timezone.utc).isoformat(),
                    "connection_uptime_seconds": round(elapsed, 2),
                }
                await websocket.send(json.dumps(response))
                logger.info(
                    f"[PING->PONG] {client_id} | "
                    f"Bağlantı açık kalma süresi: {round(elapsed, 2)}s"
                )
            else:
                # Bilinmeyen mesaj tipleri de aynen echo edilir
                await websocket.send(json.dumps({"type": "echo", "received": msg_type}))
                logger.info(f"[ECHO] {client_id} | Mesaj: {msg_type}")

    except websockets.exceptions.ConnectionClosed as e:
        logger.warning(f"[BAĞLANTI KOPTU] {client_id} | Sebep: {e}")
    finally:
        total_uptime = time.monotonic() - connected_at
        active_connections.pop(client_id, None)
        logger.info(
            f"[KAPANDI] {client_id} | Toplam açık kalma süresi: "
            f"{round(total_uptime, 2)}s | Kalan aktif bağlantı: {len(active_connections)}"
        )


async def main():
    logger.info(f"Ping-Pong WebSocket sunucusu başlatılıyor -> {HOST}:{PORT}")
    async with websockets.serve(
        handler,
        HOST,
        PORT,
        ping_interval=None,  # Kendi ping/pong mantığımızı kullanıyoruz,
        # websockets kütüphanesinin dahili keep-alive'ı ile çakışmasın diye kapalı
    ):
        await asyncio.Future()  # sonsuza kadar çalış


if __name__ == "__main__":
    asyncio.run(main())
