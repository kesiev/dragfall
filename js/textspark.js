function TextSpark(ctx, e, x, y, spark) {
    let
        progress,
        alpha;

    if (!spark.e)
        spark.e = e + spark.delay;

    progress = (e - spark.e)/spark.speed;

    if (progress < 0)
        return false;
    if (progress >= 1)
        return true;
    else if (progress < 0.3) {
        progress = progress / 0.3;
        alpha = progress;
        if (spark.isVertical)
            y-= spark.slide * Math.sin(Math.PI * 0.5 * (1-progress));
        else
            x-= spark.slide * Math.sin(Math.PI * 0.5 * (1-progress));
    } else if (progress > 0.7) {
        progress = (progress - 0.7)/ 0.3;
        alpha = 1-progress;
        if (spark.isVertical)
            y+= spark.slide * Math.sin(Math.PI * 0.5 * progress);
        else
            x+= spark.slide * Math.sin(Math.PI * 0.5 * progress);
    } else
        alpha = progress = 1;

    if (spark.backgroundColor) {
        ctx.shadowColor = ctx.fillStyle = "rgba("+spark.backgroundColor.r+","+spark.backgroundColor.g+","+spark.backgroundColor.b+","+alpha+")";
        ctx.fillRect(spark.backgroundX,spark.backgroundY,spark.backgroundWidth,spark.backgroundHeight);
    }

    ctx.font = spark.font;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.shadowBlur = spark.blur;

    ctx.fillStyle = "rgba("+spark.color.r+","+spark.color.g+","+spark.color.b+","+alpha+")";
    ctx.shadowColor = "rgba("+spark.shadowColor.r+","+spark.shadowColor.g+","+spark.shadowColor.b+","+alpha+")";
    ctx.fillText(spark.text, Math.floor(x), Math.floor(y));
}
