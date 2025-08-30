<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token invalide'], 401);
        }

        if (!$user || $user->role !== $role) {
            return response()->json(['error' => 'Accès refusé'], 403);
        }

        return $next($request);
    }
}
