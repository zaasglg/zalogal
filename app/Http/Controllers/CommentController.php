<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $postId)
    {
        $post = \App\Models\Post::findOrFail($postId);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'author_name' => 'nullable|string|max:255',
            'author_email' => 'nullable|email|max:255',
        ]);

        $comment = new \App\Models\Comment();
        $comment->post_id = $post->id;
        $comment->content = $validated['content'];

        if (auth()->check()) {
            $comment->user_id = auth()->id();
            $comment->author_name = auth()->user()->name;
            $comment->author_email = auth()->user()->email;
        } else {
            $comment->author_name = $validated['author_name'] ?? 'Guest';
            $comment->author_email = $validated['author_email'];
        }

        $comment->save();

        return back();
    }
}
