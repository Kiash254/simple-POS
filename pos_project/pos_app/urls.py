from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    ProductViewSet,
    SaleViewSet,
    WelcomeView,
    CashierLoginView,
    CashierManagementView,
)

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('sales', SaleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('welcome/', WelcomeView.as_view(), name='welcome'),
    path('login/', CashierLoginView.as_view(), name='cashier-login'),
    path('manage-cashiers/', CashierManagementView.as_view(), name='manage-cashiers'),
]