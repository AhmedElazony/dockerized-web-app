<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function start()
    {
        return response()->json([
            'success' => true,
            'message' => 'Application Started Successfully!',
            'data' => [
                [
                    'id' => 1,
                    'name' => 'Hello, World',
                ],
                [
                    'id' => 2,
                    'name' => 'Test Name'
                ]
            ]
        ], 200);
    }
}
