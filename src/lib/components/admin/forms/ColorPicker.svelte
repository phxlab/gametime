<script lang="ts">
	/**
	 * ColorPicker.svelte
	 * A grouped color selector with high-visibility selection states.
	 */

	// Define colors in a simple list
	const colors = [
		'slate',
		'gray',
		'zinc',
		'neutral',
		'stone',
		'red',
		'orange',
		'amber',
		'yellow',
		'lime',
		'green',
		'emerald',
		'teal',
		'cyan',
		'sky',
		'blue',
		'indigo',
		'violet',
		'purple',
		'fuchsia',
		'pink',
		'rose'
	];

	let { selectedColor = $bindable('indigo') } = $props();

	function selectColor(color: string, e: MouseEvent) {
		e.preventDefault();
		selectedColor = color;
	}
</script>

<div class="space-y-6">
	<!-- Header with current selection feedback -->
	<div class="flex items-center justify-between">
		<label
			for="color-picker"
			class="text-sm font-bold tracking-wider text-slate-900 dark:text-slate-100"
		>
			Brand Color
		</label>

		<div
			class="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div class="h-3 w-3 rounded-full bg-{selectedColor}-500 shadow-sm"></div>
			<span
				class="font-mono text-[10px] font-bold tracking-tighter text-slate-600 uppercase dark:text-slate-400"
			>
				{selectedColor}
			</span>
		</div>
	</div>

	<!-- Color Grid -->
	<div class="flex flex-wrap gap-2.5">
		{#each colors as color (color)}
			<button
				type="button"
				aria-label={color}
				onclick={(e) => selectColor(color, e)}
				class={[
					'relative flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-all hover:scale-110 active:scale-95',
					`bg-${color}-500`,
					selectedColor === color
						? 'z-10 scale-110 border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 dark:ring-indigo-400 dark:ring-offset-slate-950'
						: 'border-white/20 ring-1 ring-slate-200 dark:ring-slate-800'
				]}
			>
				{#if selectedColor === color}
					<!-- Checkmark for high-visibility selection -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-white drop-shadow-md"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Hidden input for form submission -->
	<input type="hidden" name="color" value={selectedColor} />
</div>
