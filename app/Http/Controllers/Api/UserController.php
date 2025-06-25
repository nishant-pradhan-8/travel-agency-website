<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
    public function update(UpdateUserRequest $request, User $user)
    {
        try{
            $validated = $request->validated();
            if($request->has('account_status')&& Auth::user()->isAdmin===false){
                return response()->json([
                    'success' => false,
                    'message' => 'You are not allowed to change account status',
                    'data' => null
                ], 400);
            }
            if($request->hasFile('profile_picture')){
                unset($validated['profile_picture']);
            }
            $user->update($validated);
            if($request->hasFile('profile_picture')){
                if($user->profile_picture && Storage::disk('public')->exists($user->profile_picture)){
                    Storage::disk('public')->delete($user->profile_picture);
                }
                $fileName = $user->id.'-'.'profile_picture'.'.'.$request->file('profile_picture')->getClientOriginalExtension();
                $path = $request->file('profile_picture')->storeAs('profile_picture',$fileName,'public');
                $user->profile_picture = $path;
                $user->save();

            }
            return response()->json([
                'success' => true,
                'message' => 'Account updated successfully',
                'data' => $user
            ],200
        );
        }catch(Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred while deleting Destination. Please Try again',
                'data' => null
            ], 500);
        }
        

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
