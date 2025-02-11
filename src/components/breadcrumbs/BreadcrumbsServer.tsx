import Link from "next/link";

export type BreadcrumbsServerProps = {
  items: string[];
};

function BreadcrumbsServer({ items }: BreadcrumbsServerProps) {
  return (
    <section className="p-4">
      <ul className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="text-black">
            {item.includes(">") && <span data-testid="separator">{item}</span>}
            {!item.includes(">") && (
              <Link href={`/items?search=${item}`}>{item}</Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

BreadcrumbsServer.displayName = Object.keys(BreadcrumbsServer).join("");

export { BreadcrumbsServer };
