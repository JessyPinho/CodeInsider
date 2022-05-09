<?php

namespace App\Http\Controllers;

use App\Models\Alternating;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Symfony\Contracts\Service\Attribute\required;

class AlternatingController extends Controller
{
    public function index()
    {
        $alternatings=Alternating::all();
        return response()
            ->json(array("data" => $alternatings ),200)
            ->header('Content-Type', 'application/json');
    }

    public function show($id) {
        $alternating = Alternating::find($id);
        if (!$alternating){
            return response()
            ->json(array('code'=> 400,'message' => 'alternating does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        return response()
            ->json(array("data" => $alternating ),200)
            ->header('Content-Type', 'application/json');
    }



    public function login(Request $request)
    {
        $alternating = Alternating::where('email',$request->email)->first();
        if (!$alternating){
            return response()
            ->json(array('code'=> 400,'message' => 'alternating does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        if (Hash::check($request->password, $alternating->password)){
            // $success['token'] =  $alternating->createToken('LaravelSanctumAuth')->plainTextToken;
            // $success['alternating'] = $alternating;
            return response()
                ->json(array('code'=> 200,'message' => 'alternating connected',"data" =>$alternating), 200)
                ->header('Content-Type', 'application/json');
        } else {
            return response()
            ->json(array('code'=> 400,'message' => 'password does not match'),400)
            ->header('Content-Type', 'application/json');
        }
    }

    public function store(Request $request){
        $rules=array(
            'name' => 'required',
            'lastname'=> 'required',
            'description'=> 'required',
            'localization'=> 'required',
            'email'=> 'required|unique:App\Models\Alternating,email',
            'password'=> 'required',
            'minimum_wage'=> 'required',
            'maximum_wage'=> 'required',
            'type_post'=> 'required',
            'year_of_study'=> 'required',
            'alternation_duration'=> 'required',
            'competences'=> 'required'
        );


        $validator=Validator::make($request->all(),$rules);
        if($validator->fails())
        {
            return response()
                ->json(array('code'=> 400,'message' => $validator->errors()),400)
                ->header('Content-Type', 'application/json');
        }
        $validated= $validator->validated();
        $validated['password'] = Hash::make($validated['password']);
        $alternating = Alternating::create($validated);
        $success['token'] =  $alternating->createToken('LaravelSanctumAuth')->plainTextToken;
        $success['email'] =  $alternating->email;
        return response()
        ->json(array("data" => $success,"message"=> "Inscription reussie"),201)
        ->header('Content-Type', 'application/json');
    }

    public function update(Request $request, $id){

        $alternating = Alternating::find($id);
        if (!$alternating){
            return response()
                ->json(array('code'=> 400,'message' => 'alternating does not exist'),400)
                ->header('Content-Type', 'application/json');
        }
        $alternating->update($request->all());
        return response()
            ->json(array('code'=> 201,'message' => 'alternating updated'),201)
            ->header('Content-Type', 'application/json');
    }

    public function delete($id) {
        $alternating = Alternating::find($id);
        if (!$alternating){
            return response()
            ->json(array('code'=> 400,'message' => 'alternating does not exist'),400)
            ->header('Content-Type', 'application/json');
        }
        Alternating::destroy($id);
        return response()
        ->json(array('code'=> 200,'message' => 'alternating deleted'),200)
        ->header('Content-Type', 'application/json');
    }
}
