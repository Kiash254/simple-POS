from rest_framework import serializers
from .models import Category, Product, Sale, SaleItem, Cashier


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'category_name', 'stock']


class SaleItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = SaleItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)

    class Meta:
        model = Sale
        fields = ['id', 'created_at', 'total_amount', 'payment_method', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        sale = Sale.objects.create(**validated_data)

        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']

            # Update product stock
            product.stock -= quantity
            product.save()

            SaleItem.objects.create(sale=sale, **item_data)

        return sale


class CashierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cashier
        fields = ['id', 'name', 'pin']  # Include 'pin' for admin management