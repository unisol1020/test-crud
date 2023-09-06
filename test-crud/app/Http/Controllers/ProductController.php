<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\StoreRequest;
use App\Http\Requests\Products\UpdateRequest;
use App\Models\Product;
use App\Traits\PaginationTrait;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    use PaginationTrait;

    public function index(): JsonResponse
    {
        $products = Product::paginate($this->perPage);

        return response()->json($products);
    }

    public function store(StoreRequest $request): JsonResponse
    {
        Product::create($request->all());

        return response()->json(['message' => 'Created'], 201);
    }

    public function show(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        return response()->json($product);
    }

    public function update(UpdateRequest $request, int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->fill($request->except(['id']));
        $product->save();

        return response()->json(['message' => 'Updated'], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([], 204);
    }
}
