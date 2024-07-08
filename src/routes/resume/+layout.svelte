<script lang="ts">
  import { Button } from "$lib/components/ui/button"
</script>

<nav class="my-4 p-4 max-w-screen-md lg:mx-auto flex items-center justify-between print:hidden">
  <a href="/" class="underline">&laquo; Back</a>
  <h3 class="uppercase font-mono text-lg">My Resume</h3>
  <Button variant="outline" on:click={() => {print()}}>Print</Button>
</nav>
<div class="prose lg:prose-lg mx-4 max-w-screen-md lg:mx-auto my-10 dark:prose-invert prose-li:m-0 prose-ul:m-0 prose-h2:mt-6 prose-h3:mt-4 prose-p:mt-2 prose-h2:mb-0 prose-h3:mb-0 prose-p:mb-0 prose-hr:my-1 prose-hr:border-t-2 prose-hr:border-muted">
  <slot />
</div>
