<?php

namespace App\Services;

use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CategoryService
{
    public function __construct(private CategoryRepository $CategoryRepository) {}

    public function index(): Collection
    {
        return $this->CategoryRepository->all();
    }

}
