interface MenuItemProps {
  menu: any;
  key: number;
  onSelect: () => void; // Tambahkan prop onSelect
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, key, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      key={key}
      className="rounded-sm border border-stroke py-6 px-7.5 shadow-default backdrop-blur-sm dark:border-strokedark cursor-pointer"
      style={{ backgroundColor: "rgba(32,33,35, 0.7)" }}
    >
      <div className="flex h-32 w-full items-center justify-center rounded-lg  bg-meta-4 text-white">
        {menu.icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="w-full">
          <h4 className="text-title-md text-center font-bold text-white">
            {menu.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
