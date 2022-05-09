<?php

namespace App\Http\Controllers;
use App\Models\Entreprise;
use App\Models\Post;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store ($id,Request $request){
        $rules = array(
            'title' => 'required',
            'type_post' => 'required',
            'duration' => 'required',
            'competences' => '',
            'description' => 'required',
        );

        $validator=Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()
                ->json(array('code'=> 400,'message' => 'error'),400)
                ->header('Content-Type', 'application/json');
            }
        $validated = $validator->validated();

        if(Entreprise::find($id)){
        $entreprise=Entreprise::find($id);
        $entreprise->posts()->create($validated);
        return response()
            ->json(array('code'=> 201,'message' => 'post create'),201)
            ->header('Content-Type', 'application/json');
        }else{
            return response()
                ->json(array('code'=> 400,'message' => 'echec create post'),400)
                ->header('Content-Type', 'application/json');
        }

    }

    public function all()
    {
        $posts = Post::all();
        return response()
        ->json(array('data' => $posts, 'code' => 200, 'message' => 'get posts sucess'), 200)
        ->header('Content-Type', 'application/json');

    }
    public function index($id)
    {
        if(Entreprise::find($id)){
            $entreprise= Entreprise::find($id);
            return $entreprise->posts()->get();

        }else{
            return response()
                ->json(array('code'=> 400,'message' => 'post does not exist'),400)
                ->header('Content-Type', 'application/json');
        }

    }

    public function update(Request $request,$entre_id,$post_id)
    {
        $rules = array(
            'title' => 'required',
            'type_post' => 'required',
            'duration' => 'required',
            'competences' => '',
            'description' => 'required',
        );
        $validator=Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()
                    ->json(array('code'=> 400,'message' => 'validator fail'),400)
                        ->header('Content-Type', 'application/json');
        }
        $validated = $validator->validated();

        if(Entreprise::find($entre_id)){
            $entreprise= Entreprise::find($entre_id);

            if($entreprise->posts()->whereId($post_id)->get()){

                $entreprise->posts()->whereId($post_id)->update($validated);
                return response()
                ->json(array('code'=> 200,'message' => 'update post sucess'),200)
                    ->header('Content-Type', 'application/json');
            }else{
                return response()
                ->json(array('code'=> 400,'message' => 'post does not exist'),400)
                    ->header('Content-Type', 'application/json');
            }
            return response()
                ->json(array('code'=> 200,'message' => 'entreprise found'),200)
                    ->header('Content-Type', 'application/json');
        }else{
            return response()
                ->json(array('code'=> 400,'message' => 'entreprise does not exist'),400)
                    ->header('Content-Type', 'application/json');
        }

    }
    public function delete($entre_id,$post_id)
    {

        if (Entreprise::find($entre_id)){
            $entreprise= Entreprise::find($entre_id);
            if($entreprise->posts()->whereId($post_id)->get()){

                $entreprise->posts()->whereId($post_id)->delete();
                return response()
                        ->json(array('code'=> 200,'message' => 'delete post sucess'),200)
                        ->header('Content-Type', 'application/json');
                }else{
                    return response()
                    ->json(array('code'=> 400,'message' => 'post not found'),400)
                        ->header('Content-Type', 'application/json');
                }
                return response()
                        ->json(array('code'=> 200,'message' => 'entreprise found'),200)
                        ->header('Content-Type', 'application/json');
        }else{
            return response()
                        ->json(array('code'=> 400,'message' => 'entreprise does not exist'),200)
                        ->header('Content-Type', 'application/json');
        }
    }
}
