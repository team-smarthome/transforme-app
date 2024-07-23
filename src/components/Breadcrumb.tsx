import { Link } from 'react-router-dom';
import { IoChevronForwardOutline } from 'react-icons/io5';

interface BreadcrumbProps {
  pageName?: string;
  url?: string;
}
// const Breadcrumb = ({ pageName, url }: BreadcrumbProps) => {
//   return (
//     <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//       <h2 className="text-title-md2 font-semibold text-black dark:text-white">
//         {pageName}
//       </h2>

//       <nav>
//         <ol className="flex items-center gap-2">
//           <li>
//             <Link to="/">Dashboard /</Link>
//           </li>
//           <li className="text-primary">{pageName}</li>
//         </ol>
//       </nav>
//     </div>
//   );
// };

// export default Breadcrumb;

function convertToTitleCase(text: string) {
  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Breadcrumb = ({ pageName, url }: BreadcrumbProps) => {
  // Parse the URL to extract breadcrumb items
  const breadcrumbs = url.split('/').filter(Boolean).slice(3);

  return (
    <nav className="flex text-zinc-600">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center pr-2">
          {/* Render the text directly */}
          {index === 0 ? 'OTMIL Cimahi' : convertToTitleCase(breadcrumb)}
          {index !== breadcrumbs.length - 1 && <IoChevronForwardOutline />}
        </div>
      ))}
    </nav>
  );
}


export default Breadcrumb
