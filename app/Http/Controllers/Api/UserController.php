<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'User deleted Successfully.'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting Destination. Please Try again'
            ], 500);
        }
    }

    public function updateAccountStatus(Request $request, User $user){
        try{
            $validated = $request->validate([
                "account_status" => "required | in:active, blocked"
            ]);
            $user = $user->update($validated);
            return response()->json([
                'success'=>true,
            'message'=> "Account Status Updated Sucessfully",
                "data"=> $user
            ]);
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch booking analytics',
                'error' => $e->getMessage()
            ], 500);
        }
       

    }

}
