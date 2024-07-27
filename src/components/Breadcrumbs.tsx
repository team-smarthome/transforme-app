import { IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function convertToTitleCase(text: string) {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function Breadcrumbs({ url }) {
  // Parse the URL to extract breadcrumb items
  const breadcrumbs = url.split('/').filter(Boolean).slice(2);

  return (
    <nav className="flex">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center pr-2">
          <Link
            to={`/${breadcrumbs.slice(1, index + 1).join('/')}`}
            className="hover:text-white duration-200 pr-2"
          >
            {convertToTitleCase(breadcrumb)}
          </Link>
          {index !== breadcrumbs.length - 1 && <IoChevronForwardOutline />}
        </div>
      ))}
    </nav>
  );
}
