import { useAppSelector } from "@/lib/hooks";
import { useSearchItemQuery } from "@/lib/slices/searchApiSlice";
import Link from "next/link";

function Breadcrumbs() {
  const { value: q, enableSearch } = useAppSelector((store) => store.search);
  const { data } = useSearchItemQuery(q as string, {
    skip: !enableSearch,
  });
  const items = data?.categories || [];
  const itemsWithSeparator = items.reduce((acc, item, index) => {
    if (index === items.length - 1) {
      return [...acc, item];
    }
    return [...acc, item, ">"];
  }, [] as string[]);

  return (
    <section className="p-4">
      <ul className="flex items-center space-x-2 text-sm text-gray-500">
        {itemsWithSeparator.map((item, index) => (
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

Breadcrumbs.displayName = Object.keys(Breadcrumbs).join("");

export { Breadcrumbs };
