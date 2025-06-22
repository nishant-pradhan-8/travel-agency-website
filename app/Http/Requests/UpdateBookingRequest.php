<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
 use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
class UpdateBookingRequest extends FormRequest
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
            'booking_status' => 'sometimes|in:cancelled,booked',
            'payment_status' => 'sometimes|in:paid,refunded,unpaid'
        ];

    }

    public function messages(): array
{
    return [
        'booking_status.in' => 'Invalid Value for the field Booking Status',
        'payment_status.in' => 'Invalid Value for the field Payment Status',
    ];
}
 public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!$this->hasAny(['booking_status', 'payment_status'])) {
                $validator->errors()->add('fields', 'Invalid Field or At least one field must be provided');
            }
        });
    }

     /**
     * Handle a failed validation attempt.
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422)
        );
    }
    
}
