
const Permission = () => {
    const liStyle = 'w-full flex flex-col mt-4 cursor-pointer'
    const spanStyle = "text-xs text-[#1E1E1E] font-semibold"
    const pStyle = "text-[10px] text-[#3D3D3D] mt-1"
    return (
        <ul className="absolute -top-24  w-72 p-4 bg-white z-40  shadow-lg rounded-lg">
            
            <li className={liStyle}>
                <span className={spanStyle}>دسترسی کامل</span>
                <p className={pStyle}>توانایی ساختن تسک در این پروژه، ویرایش تنظیمات پروژه و حذف پروژه</p>
            </li>

            <li className={liStyle}>
                <span className={spanStyle}>دسترسی ویرایش</span>
                <p className={pStyle}>توانایی ویرایش تسک در این پروژه و ویرایش تنظیمات پروژه. نمی‌تواند پروژه را حذف یا تسک جدید بسازد.</p>
            </li>

            <li className={liStyle}>
                <span className={spanStyle}>دسترسی کامنت</span>
                <p className={pStyle}>توانایی کامنت گذاشتن دارد. می‌تواند ستون تسک‌ها را تغییر دهد اما توانایی ویرایش تنظیمات پروژه را ندارد.</p>
            </li>


            <li className={liStyle}>
                <span className={spanStyle}>فقط دسترسی مشاهده</span>
                <p className={pStyle}>توانایی گذاشتن کامنت یا ویرایش تسک‌ها را ندارد.</p>
            </li>


        </ul>
    );
};

export default Permission;