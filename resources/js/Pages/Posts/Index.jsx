//componente en react que diga hola mundo
import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Post from '@/Components/Post';
export default function Index({ auth, posts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() });
    }

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Posts" />

            <div className='max-w-2xl mx-auto p-4 sm:p-6 lg:p-8'>
                <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        autoFocus
                    />
                    <InputError message={errors.title} />
                    <textarea
                        className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Body"
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}

                    />
                    <InputError message={errors.title} />
                    <PrimaryButton
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
                    disabled={processing}
                    >
                        Crear
                    </PrimaryButton>
                </form>

                <div>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
