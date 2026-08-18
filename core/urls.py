import os
from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.views.static import serve
from django.http import Http404
from .views import home, api_health, api_siege_simulate, api_contact

def serve_static(request, path):
    """
    Robust static file server that checks STATIC_ROOT (after collectstatic)
    and falls back to BASE_DIR / 'static'. Works in Minikube, Docker, and local runserver.
    """
    # 1. Try from STATIC_ROOT (collected static files)
    if os.path.exists(settings.STATIC_ROOT):
        file_path = os.path.join(settings.STATIC_ROOT, path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return serve(request, path, document_root=settings.STATIC_ROOT)

    # 2. Try from source static directory
    static_dir = settings.BASE_DIR / 'static'
    if os.path.exists(static_dir):
        file_path = os.path.join(static_dir, path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return serve(request, path, document_root=static_dir)

    # 3. Fallback to default static root
    return serve(request, path, document_root=settings.STATIC_ROOT)

urlpatterns = [
    path('', home, name='home'),
    path('api/health/', api_health, name='api_health'),
    path('api/siege-simulate/', api_siege_simulate, name='api_siege_simulate'),
    path('api/contact/', api_contact, name='api_contact'),
    path('admin/', admin.site.urls),
    # Serve static assets for Kubernetes/Minikube/Gunicorn/Standalone
    re_path(r'^static/(?P<path>.*)$', serve_static, name='static_serve'),
]