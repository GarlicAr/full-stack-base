<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(private CategoryService $CategoryService) {}

    public function index(): Collection
    {
        return $this->CategoryService->index();
    }

}
