<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

/**
 * Class BaseRepository
 */
abstract class BaseRepository
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|Model[]
     */
    public function all(array $columns = ['*'], ?string $orderBy = null, ?string $orderByDirection = 'asc')
    {
        $query = $this->model->query();

        $query->when($orderBy, function ($q) use ($orderBy, $orderByDirection) {
            return $q->orderBy($orderBy, $orderByDirection);
        });

        return $query->get($columns);
    }

    /**
     * @param  array  $relationships
     * @param  array  $withCount
     */
    public function findById($id, $relationships = [], $withCount = [], $addSelect = []): mixed
    {
        if (empty($relationships)) {
            return $this->model->whereId($id)->first();
        }

        return $this->model->addSelect($addSelect)->with($relationships)->withCount($withCount)->whereId($id)->first();
    }

    public function store(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function updateById($id, array $data): Model
    {
        $model = $this->findById($id);

        $model->update($data);

        return $model;
    }

    public function updateOrStore(array $primaryKey, array $data): Model
    {
        return $this->model->updateOrCreate($primaryKey, $data);
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    public function deleteById($id): bool
    {
        $model = $this->findById($id);

        return $model->delete();
    }

    /**
     * Dynamic findBy function
     *
     * @param  false  $multiple
     * @param  array  $select
     * @param  array  $scopes
     * @return mixed
     */
    public function findBy($column, $value, $multiple = false, $select = [], $scopes = [], $with = [], $aggregates = [], $orderBy = [])
    {
        $model = (is_array($value) || $value instanceof Collection)
            ? $this->model->whereIn($column, $value)
            : $this->model->where($column, $value);

        $model->addSelect($select)->with($with);

        if ($scopes) {
            foreach ($scopes as $scope) {
                $model->{$scope}();
            }
        }

        if ($aggregates) {
            foreach ($aggregates as $aggregate => $subject) {
                $model->{$aggregate}($subject);
            }
        }

        // Apply ordering if provided
        if ($orderBy) {
            foreach ($orderBy as $column => $direction) {
                $model->orderBy($column, $direction);
            }
        }

        if ($multiple) {
            return $model->get();
        }

        return $model->first();
    }

    /**
     * For searching in json column
     *
     * @return string
     */
    public function parseOrderBy($value)
    {
        $exploded = explode('->', $value);

        foreach ($exploded as &$item) {
            if (ctype_upper($item)) {
                continue;
            }

            $item = Str::snake($item);
        }

        return implode('->', $exploded);
    }
}
