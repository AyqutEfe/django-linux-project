☁️ Cloud Engineering & DevOps Internship Sandbox

Bu depo, Cloud Engineering (Bulut Mühendisliği) ve DevOps staj sürecimde; modern bulut mimarilerini, konteyner orkestrasyonunu (Docker Swarm), Jenkins CI/CD pipeline'larını, sıfır kesintili güncelleme stratejilerini ve konteyner güvenliğini uygulamalı olarak deneyimlemek ve test etmek amacıyla oluşturulmuştur.

Proje, üretim ortamı (production-ready) standartlarında geliştirilen bir Django web uygulamasının Docker Swarm, Jenkins, Nginx ve PostgreSQL altyapıları üzerinde yüksek erişilebilirlik (High Availability) ile çalıştırılmasını ve otomatik dağıtımını simüle eder.

🌟 Öne Çıkan Bulut & DevOps Teknolojileri
🐳 1. Konteyner Orkestrasyonu & Küme Yönetimi (Docker Swarm)
High Availability (Yüksek Erişilebilirlik): Web servisinin 3 replika (replicas: 3) olarak çalıştırılarak yük dengelemesi ve kesintisiz hizmet sunması.
Zero-Downtime Rolling Updates: Kesintisiz yayınlama (order: start-first, parallelism: 1, delay: 10s) yapılandırması.
Automatic Healthcheck & Rollback: HTTP/Database seviyesinde sağlık denetimleri ve başarısız dağıtımlarda otomatik eski sürüme dönme (failure_action: rollback).
Overlay Networks: Servisler arası güvenli ve izole iletişim sağlayan küme ağı (django-overlay).
⚙️ 2. CI/CD Pipeline Otomasyonu (Jenkins)
Bağımsız Jenkins Sunucusu: Docker Swarm kümesinden ayrı, kendi VM'inde çalışan Jenkins kontrolcüsü.
Multi-Stage Pipeline (Jenkinsfile): Checkout → Build → Push → Deploy aşamalarından oluşan, kod deposundan (SCM) okunan declarative pipeline.
Otomatik İmaj Etiketleme: Her build'de artan sürüm etiketi (v1.0.${BUILD_NUMBER}) ve latest etiketinin birlikte push edilmesi.
Güvenli Kimlik Bilgisi Yönetimi: Docker Hub kimlik bilgilerinin Jenkins Credentials Store üzerinde şifreli saklanması (withCredentials), plaintext şifre kullanılmaması.
Şifresiz SSH Dağıtımı: Jenkins → Swarm Manager arası ed25519 SSH anahtarıyla güvenli, interaktif olmayan scp / ssh tabanlı dağıtım.
🎯 3. Sıfır Kesinti Doğrulaması (Load Testing with Siege)
Ateş Altında Test: Deployment sürerken Siege yük testi aracıyla eş zamanlı istek gönderilerek servisin kesintisiz yanıt verdiğinin kanıtlanması.
Availability Metriği: Testler %100.00 erişilebilirlik ve 0 başarısız işlem (failed transaction) hedefiyle koşulur.
Gerçek Trafik Simülasyonu: Test, cluster dışından public IP üzerinden çalıştırılarak gerçek kullanıcı deneyimi simüle edilir.
🔒 4. Bulut Güvenliği & Secret Yönetimi (Cloud Security)
Docker Secrets: Hassas veritabanı parolaları ve gizli anahtarların (/run/secrets/) Swarm seviyesinde şifrelenerek yönetilmesi.
Dynamic Secret Resolver: core/settings.py içerisindeki custom get_secret mimarisi ile üretimde Docker Secret, yerelde ortam değişkeni (.env) kullanımı.
Non-Root Container Security: Docker konteynerlerinin kısıtlı yetkilere sahip django kullanıcısı ile çalıştırılması.
📦 5. Optimize Konteyner Mimari (Multi-Stage Docker Builds)
Hafif ve Güvenli İmajlar: frontend-builder (Node.js Alpine) ve backend-builder (Python Alpine) aşamalarıyla bağımlılıkların derlenip sadece nihai çıktıların minimal runtime imajına taşınması.
🌐 6. Web Sunucusu & Reverse Proxy (Nginx)
Trafik Yönlendirme & Yük Dengeleme: İstemci isteklerinin güvenli bir şekilde backend servislerine yönlendirilmesi.
Statik Dosya Yönetimi: Django statik dosyalarının (collectstatic) Nginx üzerinden yüksek performansla sunulması.
🛠️ Teknolojik Yanıtlar ve Bileşen Özeti
Katman Kullanılan Teknolojiler / Araçlar
Cloud & Orchestration Docker Swarm, Docker Stack, Docker Secrets, Overlay Network
CI/CD & Automation Jenkins, Jenkinsfile (Declarative Pipeline), Git, SSH
Load & Reliability Testing Siege, Docker Swarm Healthcheck, Rolling Update
Containerization Docker, Multi-stage Builds, Docker Compose, Alpine Linux
Web & Reverse Proxy Nginx (Alpine), Gunicorn WSGI Server
Backend & Database Python 3.11, Django 5.x, PostgreSQL 16 (Alpine), SQLite
Security & Config Docker Secrets, Dynamic Secret Fallback, Non-root Linux User
📁 Proje Dizin Yapısı
text
.
├── core/ # Django çekirdek ayarları & Docker Secret resolver (get_secret)
├── frontend/ # Frontend bağımlılıkları ve derleme konfigürasyonu
├── nginx/ # Nginx Reverse Proxy ayarları (nginx.conf)
├── Dockerfile # Multi-stage Alpine Docker imajı
├── docker-compose.yml # Geliştirme ortamı çoklu konteyner mimarisi
├── docker-stack.yml # Docker Swarm üretim/cluster dağıtım konfigürasyonu (healthcheck + update_config)
├── Jenkinsfile # Jenkins CI/CD pipeline tanımı (Checkout → Build → Push → Deploy)
├── requirements.txt # Python bağımlılıkları
└── README.md # Proje dokümantasyonu
🚀 Dağıtım Seçenekleri (Deployment)

1. Docker Swarm Stack ile Production Dağıtımı
   bash

# Swarm kümesini başlatın

docker swarm init

# Stack servislerini ve gizli anahtarları (secrets) oluşturup yayınlayın

docker stack deploy -c docker-stack.yml my-django-stack 2. Docker Compose ile Yerel Geliştirme Ortamı
bash
docker-compose up --build -d 3. Jenkins CI/CD ile Otomatik Dağıtım

Kod main branch'ine push edildiğinde veya Jenkins üzerinden manuel tetiklendiğinde pipeline şu aşamaları otomatik yürütür:

Checkout — Depo GitHub'dan çekilir.
Build — Multi-stage Dockerfile ile vX.Y.${BUILD_NUMBER} ve latest etiketli imaj derlenir.
Push — İmaj, Jenkins Credentials Store'daki bilgilerle Docker Hub'a gönderilir.
Deploy — Güncel docker-stack.yml, SSH üzerinden Swarm Manager'a kopyalanır ve docker stack deploy ile devreye alınır; start-first + healthcheck sayesinde kesinti yaşanmaz.
bash

# Jenkins arayüzünde ilgili pipeline job'ını manuel tetiklemek için:

Build Now
🧪 Sıfır Kesinti Testi (Zero-Downtime Verification)

Deployment sürerken sistemin kesintisiz çalıştığını doğrulamak için Siege kullanılır:

bash
siege -c 10 -t 30s http://<SWARM_PUBLIC_IP>/

Beklenen sonuç:

Metrik Hedef
Availability %100.00
Failed transactions 0

Test raporunun tam çıktısı docs/siege-report.txt (veya ilgili teslim klasörü) altında paylaşılır.
