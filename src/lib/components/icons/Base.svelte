<script lang="ts">
	const { children, ...restProps } = $props();
</script>

<svg
	aria-hidden="true"
	class="inline-block align-[-0.125em]"
	viewBox="0 0 640 640"
	width="1em"
	height="1em"
	fill="currentColor"
	{...restProps}
>
	{@render children()}
</svg>
