const [{ isDragging }, dragRef] = useDrag({
    item: { type: "item", item: myitem },
    begin: () => {
        console.log("drag began");
    },
    end: (dropResult) => {
        console.log("drag end");
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
});