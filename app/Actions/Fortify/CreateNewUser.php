<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'role' => ['required', 'in:buyer,seller'],
            'phone' => ['required', 'string', 'max:20'],
        ];

        // Добавляем валидацию для продавцов
        if ($input['role'] === 'seller') {
            $rules['organization_type'] = ['required', 'string', 'max:255'];
            $rules['bin'] = ['required', 'string', 'max:12'];
        }

        Validator::make($input, $rules)->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $input['role'],
            'phone' => $input['phone'],
            'organization_type' => $input['organization_type'] ?? null,
            'bin' => $input['bin'] ?? null,
        ]);
    }
}
