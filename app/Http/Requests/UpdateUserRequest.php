<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'profile_picture' => 'sometimes|image|nullable|mimes:jpg,jpeg,png,svg|max:5242880',
            'full_name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique('users')->ignore(Auth::user()->id)
            ],
            'address' => 'sometimes|string|max:255',
            'phone' => 'sometimes|numeric|digits_between:7,20',
            'account_status'=> 'sometimes|in:active,blocked'
        ];
    }
    

   

}
