

using System.Text.Json.Serialization;

namespace API.DTOs;

public class FlightSearchParam
{
    [JsonPropertyName("from")]
    public string From { get; set; }
    [JsonPropertyName("destination")]
    public string Destination { get; set; }
    [JsonPropertyName("fromDate")]
    public DateTime? FromDate { get; set; }
    [JsonPropertyName("toDate")]
    public DateTime? ToDate { get; set; }
    [JsonPropertyName("numberOfPassengers")]
    public int NumberOfPassengers { get; set; } = 1;
}
