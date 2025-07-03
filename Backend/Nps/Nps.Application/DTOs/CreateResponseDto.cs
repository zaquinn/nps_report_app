using System.ComponentModel.DataAnnotations;

namespace Nps.Application.DTOs;

public class CreateResponseDto
{
    [Required(ErrorMessage = "Product name is required")]
    [MinLength(1, ErrorMessage = "Product name cannot be empty")]
    public string ProductName { get; set; } = string.Empty;
    
    [Range(0, 5, ErrorMessage = "Rating must be between 0 and 5")]
    public int Rating { get; set; }
    public string? Comment { get; set; }
}