using Nps.Domain.Entities;

namespace Nps.Application.Services;

public static class NpsCalculator
{
    public static double Calculate(List<CustomerResponse> responses)
    {
        if (responses.Count == 0) return 0;

        var promoters = responses.Count(r => r.Rating >= 4);
        var detractors = responses.Count(r => r.Rating <= 2);
        var nps = ((double)(promoters - detractors) / responses.Count) * 100;
        return Math.Round(nps, 2);
    }
}