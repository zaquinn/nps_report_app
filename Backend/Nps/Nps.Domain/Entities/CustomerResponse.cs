using Nps.Domain.Enums;

namespace Nps.Domain.Entities;

public class CustomerResponse
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ProductName { get; set; } = string.Empty;
    public int Rating { get; set; } // 0 to 5
    public string? Comment { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public NpsCategory GetCategory() => Rating switch
    {
        >= 4 => NpsCategory.Promoter,
        3 => NpsCategory.Passive,
        _ => NpsCategory.Detractor
    };
}