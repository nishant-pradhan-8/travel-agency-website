<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
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
            'noOfPeople'=>['required','integer', 'min:1'],
            'departureId' => ['required', 'exists:departures,id'],
            'messege' => ['nullable', 'string', 'max:500'],
            'totalPrice' => ['required', 'integer']
        ];
    }
    public function messages(): array
    {
        return [
            'noOfPeople.required' => 'Please enter number of people.',
            'departure.required' => 'Please select a valid departure date.',
        ];
    }
}
