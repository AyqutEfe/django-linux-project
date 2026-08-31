"""
Ping-Pong Test İstemcisi
-------------------------
Sunucuya bağlanır, her PING_INTERVAL saniyede bir "ping" mesajı gönderir,
gelen "pong" cevabını loglar. Bağlantının uzun süre (10+ dakika) kopmadan
açık kaldığını kanıtlamak için kullanılır.

Kullanım:
    python client_test.py wss://socket.portvmind.local/
    python client_test.py ws://localhost:8765/          (yerel test için)
"""

import asyncio
import json
import logging
import sys
import time
from datetime import datetime, timezone

import websockets

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("ping-pong-client")

PING_INTERVAL = 5  # saniye
# Test süresi: 0 verilirse süresiz (Ctrl+C ile durdurulana kadar) çalışır
TEST_DURATION_SECONDS = 0


async def run_client(uri: str):
    logger.info(f"Sunucuya bağlanılıyor: {uri}")
    start_time = time.monotonic()

    async with websockets.connect(uri) as websocket:
        logger.info("Bağlantı kuruldu. Ping-pong döngüsü başlıyor...")
        ping_count = 0

        try:
            while True:
                ping_count += 1
                ping_msg = {
                    "type": "ping",
                    "seq": ping_count,
                    "client_time": datetime.now(timezone.utc).isoformat(),
                }
                await websocket.send(json.dumps(ping_msg))

                response_raw = await websocket.recv()
                response = json.loads(response_raw)

                elapsed_total = time.monotonic() - start_time
                logger.info(
                    f"PING #{ping_count} gönderildi -> PONG alındı | "
                    f"Sunucu uptime: {response.get('connection_uptime_seconds')}s | "
                    f"Toplam test süresi: {round(elapsed_total, 2)}s"
                )

                if TEST_DURATION_SECONDS and elapsed_total >= TEST_DURATION_SECONDS:
                    logger.info(
                        f"Belirlenen test süresi ({TEST_DURATION_SECONDS}s) doldu, "
                        f"bağlantı kapatılıyor."
                    )
                    break

                await asyncio.sleep(PING_INTERVAL)

        except websockets.exceptions.ConnectionClosed as e:
            elapsed_total = time.monotonic() - start_time
            logger.error(
                f"Bağlantı beklenmedik şekilde koptu! "
                f"Toplam açık kalma süresi: {round(elapsed_total, 2)}s | Sebep: {e}"
            )
            sys.exit(1)


if __name__ == "__main__":
    uri = sys.argv[1] if len(sys.argv) > 1 else "ws://localhost:8765/"
    asyncio.run(run_client(uri))
