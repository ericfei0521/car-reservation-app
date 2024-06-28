type TimeoutId = ReturnType<typeof setTimeout>

export const debounce = <T extends (...args: any) => void>(
    func: T,
    timeout = 300
): ((...args: Parameters<T>) => void) => {
    let timer: TimeoutId

    return (...args: Parameters<T>): void => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}
