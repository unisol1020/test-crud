<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_product(): void
    {
        $response = $this->get('/api/v1/products');

        $response->assertStatus(200);
    }

    public function test_create_product(): void
    {
        $postData = [
            'title' => 'Product title',
        ];

        $response = $this->post('/api/v1/products', $postData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', $postData);
    }

    public function test_update_product(): void
    {
        $product = Product::factory()->create();

        $putData = [
            'title' => 'Product title',
        ];

        $response = $this->patch("/api/v1/products/{$product->id}", $putData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('products', $putData);
    }

    public function test_delete_product(): void
    {
        $product = Product::factory()->create();

        $response = $this->delete("/api/v1/products/{$product->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }
}
