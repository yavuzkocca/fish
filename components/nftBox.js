export default function NFTBox({ name, image, description, attributes }) {
    return (
        <div class="max-w-sm bg-white border border-zinc-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700">
            <a href="#">
                <img class="rounded-t-lg" src={image} alt={`NFT ${name}`} />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{name}</h5>
                </a>
                <p class="mb-3 font-normal text-zinc-700 dark:text-zinc-400">{description}</p>
            </div>
        </div>
    )
}