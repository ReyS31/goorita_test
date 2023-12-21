<x-mail::message>
    # Introduction
    ### Hello, {{ $user->name }}

    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem exercitationem vitae tempore id
    perspiciatis provident labore repellendus porro, quasi eaque? Quis obcaecati quasi error amet atque
    ipsum id corporis optio?

    <x-mail::button :url="''">
        Button Text
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
