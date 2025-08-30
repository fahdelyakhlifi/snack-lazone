<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CodePin;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $codePin = CodePin::where('code', $request->code)->first();

        if (!$codePin) {
            return response()->json(['error' => 'Code PIN invalide'], 401);
        }

        $token = JWTAuth::fromUser($codePin);


        return $this->respondWithToken($token, $codePin);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => $user,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }
}

