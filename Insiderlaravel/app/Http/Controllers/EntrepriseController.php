<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Entreprise;
use Laravel\Sanctum\HasApiTokens;



class EntrepriseController extends Controller
{
    public function store(Request $request)
    {
        $rules = array(
            'name' => 'required',
            'email' => 'required|unique:App\Models\Entreprise,email',
            'localization' => 'required',
            'description' => 'required',
            'number_employee' => 'required',
            'password' => 'required|min:8',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()
                ->json(array('code' => 400, 'message' => $validator->er), 400)
                ->header('Content-Type', 'application/json');
        }

        $validated = $validator->validated();
        $validated['password'] = Hash::make($request->password);
        $entreprise = Entreprise::create($validated);
        $success['token'] =  $entreprise->createToken('LaravelSanctumAuth')->plainTextToken;
        $success['entreprise'] = $entreprise;
        return response()
            ->json(array("data" => $success), 201)
            ->header('Content-Type', 'application/json');
    }

    public function login(Request $request)
    {
        $entreprise = Entreprise::where('email',$request->email)->first();
        if (!$entreprise){
            return response()
            ->json(array('code'=> 400,'message' => 'entreprise does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        if (Hash::check($request->password, $entreprise->password)){
            // $success['token'] =  $entreprise->createToken('LaravelSanctumAuth')->plainTextToken;
            // $success['entreprise'] = $entreprise;
            return response()
                ->json(array('code'=> 200,'message' => 'entreprise connected', "data" => $entreprise), 200)
                ->header('Content-Type', 'application/json');
        } else {
            return response()
            ->json(array('code'=> 400,'message' => 'password does not match'),400)
            ->header('Content-Type', 'application/json');
        }
    }


    public function update($id,Request $request)
    {
        $rules = array(
            'name' => 'required',
            'email' => 'required|unique:App\Models\Entreprise,email',
            'localization' => 'required',
            'description' => 'required',
            'number_employee' => 'required',
            'password' => 'required|min:8',
        );
        $validator=Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()
                    ->json(array('code'=> 400,'message' => $validator->errors()),400)
                        ->header('Content-Type', 'application/json');
        }
        $validated = $validator->validated();
        if (Entreprise::find($id)){
            $restaurant= Entreprise::find($id);
            $restaurant->name=$validated['name'];
            $restaurant->email=$validated['email'];
            $restaurant->localization=$validated['localization'];
            $restaurant->description=$validated['description'];
            $restaurant->number_employee=$validated['number_employee'];
            $restaurant->password=$validated['password'];
            $restaurant-> save();
            return response()
            ->json(array('code' => 200, 'message' => 'update entreprise sucess'), 200)
            ->header('Content-Type', 'application/json');
        }
        return response()
        ->json(array('code'=> 400,'message' => 'update error'),400)
            ->header('Content-Type', 'application/json');
    }

    public function index()
    {
        return Entreprise::all();
        return response()
        ->json(array('code' => 201, 'message' => 'get entreprise sucess'), 201)
        ->header('Content-Type', 'application/json');

    }

    public function show($id) {
        $entreprise = Entreprise::find($id);
        if (!$entreprise){
            return response()
            ->json(array('code'=> 400,'message' => 'entreprise does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        return response()
        ->json(array("data" => $entreprise) ,200)
        ->header('Content-Type', 'application/json');
    }

    public function delete($id) {
        $entreprise = Entreprise::find($id);
        if (!$entreprise){
            return response()
            ->json(array('code'=> 400,'message' => 'entreprise does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        Entreprise::destroy($id);
        return response()
        ->json(array('code'=> 200,'message' => 'entreprise deleted'),200)
        ->header('Content-Type', 'application/json');
    }
}

