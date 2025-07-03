namespace Nps.Application.DTOs;

public class ResponseReportDto
{
    public int TotalResponses { get; set; }
    public int Promoters { get; set; }
    public int Detractors { get; set; }
    public int Neutral { get; set; }
    public double NpsScore { get; set; }
}