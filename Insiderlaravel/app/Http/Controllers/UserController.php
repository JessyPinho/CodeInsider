<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users=User::all();
        return response()
            ->json($users ,201)
            ->header('Content-Type', 'application/json');
    }

    public function show($id) {
        $user = User::find($id);
        if (!$user){
            return response()
            ->json(array('code'=> 400,'message' => 'user does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        return response()
        ->json($user ,200)
        ->header('Content-Type', 'application/json');
    }




    public function store(Request $request){
        $rules=array(
            'email' => 'required|unique:App\Models\User,email',
            'password' => 'required'
        );


        $messages=array(
                'name.required' => 'Please enter a name.',
                'description.required' => 'Please enter a description.',
                'localization.required' => 'Please enter a localization.',
                'phone_number' => 'Please enter a phone number.',
                'website' => 'Please enter a website',
                'hours' => 'Please enter a hours'
        );
        $validator=Validator::make($request->all(),$rules);
        if($validator->fails())
        {
            return response()
                ->json(array('code'=> 400,'message' => 'validation error'),400)
                ->header('Content-Type', 'application/json');
        }
        $validated= $validator->validated();
        User::create($validated);
        return response()
        ->json(array('code'=> 201,'message' => 'user created'),201)
        ->header('Content-Type', 'application/json');
    }

    public function update(Request $request, $id){
        $rules=array(
            'email' => 'unique:App\Models\User,email',
        );
        $user = User::find($id);
        if (!$user){
            return response()
                ->json(array('code'=> 400,'message' => 'user does not exist'),400)
                ->header('Content-Type', 'application/json');
        }
        $validator=Validator::make($request->all(),$rules);
        if($validator->fails())
        {
            return response()
                ->json(array('code'=> 400,'message' => 'email is already use'),400)
                ->header('Content-Type', 'application/json');
        }
        $user->update($request->all());
        return response()
            ->json(array('code'=> 201,'message' => 'user updated'),201)
            ->header('Content-Type', 'application/json');
    }

    public function delete($id) {
        $user = User::find($id);
        if (!$user){
            return response()
            ->json(array('code'=> 400,'message' => 'user does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        User::destroy($id);
        return response()
        ->json(array('code'=> 200,'message' => 'user deleted'),200)
        ->header('Content-Type', 'application/json');
    }


    // public function authentificate(Request $request){
    //     $rules=array(
    //         'email'=> 'required',
    //         'password'=> 'required',
    //     );
    //     $validator=Validator::make($request->all(),$rules);
    //     if($validator->fails())
    //     {
    //         return response()
    //             ->json(array('code'=> 400,'message' => 'not all fields are filled in'),400)
    //             ->header('Content-Type', 'application/json');
    //     }
    //     $validated= $validator->validated();

    //     $alternating_exist = DB::table('alternatings')->where('email',$validated['email'])->exists();
    //     if ($alternating_exist == False){
    //         return response()
    //             ->json(array('code'=> 400,'message' => 'alternating does not exist'),400)
    //             ->header('Content-Type', 'application/json');
    //     }
    //     $alternating = DB::table('alternatings')->where('email',$validated['email'])->get();
    //     $password_hashed = Hash::make($validated['password']);
    //     return response()
    //     ->json($password_hashed,200)
    //     ->header('Content-Type', 'application/json');
    //     if ($password_hashed == $alternating[0]->password){
    //         return response()
    //             ->json($alternating,200)
    //             ->header('Content-Type', 'application/json');
    //     } else {
    //         return response()
    //             ->json(array('code'=> 400,'message' => 'the password does not match'),400)
    //             ->header('Content-Type', 'application/json');
    //     }
    // }
}
