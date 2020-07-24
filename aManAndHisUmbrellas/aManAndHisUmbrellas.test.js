function umbrella(weather) {
    let home = 0;
    let work = 0;
    const umbrellaWeather = ["rainy", "thunderstorms"];

    for (let i = 0; i < weather.length; i++) {
        if (umbrellaWeather.includes(weather[i])) {
            // home
            if (i % 2 === 0) {
                if (!home) {
                    work++;
                } else {
                    home--;
                    work++;
                }
            // work
            } else {
                if (!work) {
                    home++;
                } else {
                    work--;
                    home++;
                }
            }
        }
    }

    return home + work;
}

test('minimum numbers of umbrellas', () => {
    expect(umbrella(["rainy", "rainy", "rainy", "rainy"])).toBe(1)
})
