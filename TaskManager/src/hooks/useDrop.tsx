const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "item",
    drop: (item, monitor) => {
        console.log(`Dropped item: ${JSON.stringify(item)}`);
    },
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
});