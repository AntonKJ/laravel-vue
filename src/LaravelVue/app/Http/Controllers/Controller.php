<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected int $limit = 25;

    protected function orderToQuery(Request $request, QueryBuilder $query): QueryBuilder
    {
        $orderBy = $request->get('order_by', $request->order_column);
        $sortOrder = $request->get('sort_order', $request->order_direction);
        $querySortOrder = (!empty($sortOrder)) ? $sortOrder : 'desc';

        if ($orderBy) {
            $query->orderBy($orderBy, $querySortOrder);
        } else {
            $query->orderBy('id', $querySortOrder);
        }

        return $query;
    }

}
