<script lang="ts">
	interface Props {
		type?: 'text' | 'password';
		name: string;
		id?: string;
		placeholder?: string;
		required?: boolean;
	}

	let { type = 'text', name, id = name, placeholder = name, required = false }: Props = $props();
</script>

<input
	{type}
	{name}
	{id}
	{placeholder}
	{required}
	class="duration-200outline-none block w-full rounded-xl border border-gray-300 bg-white p-4 text-lg text-gray-900 placeholder-gray-400 transition-all outline-none
	focus:border-transparent focus:ring-2 focus:ring-blue-500
	dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-500"
/>
