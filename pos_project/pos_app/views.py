from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from .models import Category, Product, Sale, SaleItem, Cashier
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    SaleSerializer,
    SaleItemSerializer,
    CashierSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer



class WelcomeView(APIView):
    def get(self, request):
        cashiers = Cashier.objects.all()
        serializer = CashierSerializer(cashiers, many=True)
        return Response({
            "message": "Welcome to Power Star Supermarket",
            "cashiers": serializer.data
        })


class CashierLoginView(APIView):
    def post(self, request):
        cashier_id = request.data.get('id')  # Get cashier ID from request
        pin = request.data.get('pin')  # Get PIN from request

        try:
            # Verify cashier ID and PIN
            cashier = Cashier.objects.get(id=cashier_id, pin=pin)
            return Response({"message": f"Welcome, {cashier.name}!"})
        except Cashier.DoesNotExist:
            return Response({"error": "Invalid ID or PIN"}, status=status.HTTP_401_UNAUTHORIZED)


class CashierManagementView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CashierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)