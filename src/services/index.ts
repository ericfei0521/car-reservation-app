interface ResponseType {
    FlightDate: string
    FlightNumber: string
    AirRouteType: number
    AirlineID: string
    DepartureAirportID: string
    ArrivalAirportID: string
    ScheduleDepartureTime: string
    ActualDepartureTime: string
    EstimatedDepartureTime: string
    DepartureRemark: string
    DepartureRemarkEn: string
    Terminal: string
    Gate: string
    Apron: string
    CodeShare: string
    IsCargo: true
    AcType: string
    BaggageClaim: string
    CheckCounter: string
    UpdateTime: string
}

interface FetchFlightDataPayload {
    flightNumber: string
    airlineID: string
    onSuccess: (data?: ResponseType[]) => void
    onError: (error: string) => void
}

export const fetchFlightData = ({
    flightNumber,
    airlineID,
    onSuccess,
    onError,
}: FetchFlightDataPayload): void => {
    const token = localStorage.getItem("token")
    fetch(
        `https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON&$filter=FlightNumber eq '${flightNumber}' and AirlineID eq '${airlineID}'`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept-Encoding": "br,gzip",
            },
        }
    )
        .then((res) => {
            if (!res.ok) throw new Error("發生錯誤 請洽客服")
            return res.json()
        })
        .then((data: ResponseType[]) => {
            onSuccess(data)
        })
        .catch((err) => {
            const message = err?.Error
            onError(message)
        })
}

export const fetchToken = async (): Promise<string> => {
    const parameter = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "eric0521bigjohn-afdbd696-28c5-4f9e",
        client_secret: "9f6e7dc2-fa63-43ec-9287-f66d41904dd4",
    })

    const auth_url =
        "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token"

    const response = await fetch(auth_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "br,gzip",
        },
        body: parameter.toString(),
    })

    const data = await response.json()
    return data.access_token
}
