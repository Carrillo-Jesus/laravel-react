import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useForm, usePage } from '@inertiajs/react';
import 'dayjs/locale/es';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
dayjs.locale('es');
dayjs.extend(relativeTime);
const Post = ({ post }) => {
    const [open, setOpen] = React.useState(false);
    const auth = usePage().props.auth;
    const [editing, setEditing] = React.useState(false);
    const {data, setData, patch, processing, errors, reset} = useForm({
        title: post.title,
        body: post.body
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('posts.update', post.id), {onSuccess: () => setEditing(false)});
        setEditing(false);
    }

    return (
        <div className="post bg-white p-6 rounded-lg shadow-md mt-4">
            <div className='flex justify-between'>
                {
                    editing ?  <h2 className="text-2xl font-bold mb-2">Editando post</h2>
                    :
                    <h2 className="text-2xl font-bold mb-2">{ post.title }</h2>
                }
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                        <button className="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Ver</a>
                            {auth.user.id === post.user_id && (
                                <div>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setEditing(true)}>Editar</a>
                                    <Dropdown.Link as="button" href={route('posts.destroy', post.id)} method="delete">
                                        Eliminar
                                    </Dropdown.Link>
                                </div>
                            )}
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            {
                editing ? (
                    <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoFocus
                        />
                        <textarea
                            className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Body"
                            value={data.body}
                            onChange={(e) => setData('body', e.target.value)}
                        />
                        <InputError className='mt-2' message={errors.message}></InputError>
                        <div className='space-x-2'>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={processing}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setEditing(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) :
                <>
                    <p className="text-gray-700 text-base">{post.body}</p>
                    <p className="text-gray-500 text-sm">Autor: {post.user.name}</p>
                    <p className="text-gray-500 text-sm">Publicado: { dayjs(post.created_at).fromNow() }</p>
                </>
            }
        </div>
    );
};

export default Post;
