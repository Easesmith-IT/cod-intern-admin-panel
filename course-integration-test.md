# Course API Integration Test Guide

## API Endpoints Integration

### 1. Get Courses API
**Frontend URL:** `/admin/courses`
**Backend URL:** `GET /courses`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (draft, published, archived)
- `category` - Filter by category
- `level` - Filter by level (beginner, intermediate, advanced)
- `search` - Search in title, description, category

**Example API Call:**
```
GET /courses?page=1&limit=10&status=published&category=Web Development&search=javascript
```

### 2. Update Course Status API
**Backend URL:** `PATCH /courses/:id/status`
**Payload:**
```json
{
  "status": "published" // or "draft", "archived"
}
```

### 3. Delete Course API (Soft Delete)
**Backend URL:** `DELETE /courses/:id`
**Payload:**
```json
{
  "deleteType": "soft" // or "hard"
}
```

## Frontend Components Updated

### 1. Course Component (`/src/components/courses/course.jsx`)
- ✅ Added real data handling
- ✅ Added status toggle functionality
- ✅ Added delete confirmation modal
- ✅ Added proper price calculation
- ✅ Added student count calculation
- ✅ Added instructor names handling
- ✅ Added thumbnail image support
- ✅ Added course creation date display

### 2. Course Skeleton (`/src/components/courses/course-skeleton.jsx`)
- ✅ Created loading skeleton matching table structure

### 3. Courses Page (`/src/app/admin/courses/page.jsx`)
- ✅ Integrated with useApiQuery hook
- ✅ Added search functionality
- ✅ Added status filtering (draft, published, archived)
- ✅ Added category filtering
- ✅ Added level filtering (beginner, intermediate, advanced)
- ✅ Added pagination support
- ✅ Added loading states with skeletons
- ✅ Added empty state handling
- ✅ Updated table headers to match data structure

## Features Added

### Search & Filtering
- **Search:** Searches in course title, description, overview, category, subCategory
- **Status Filter:** All, Draft, Published, Archived
- **Category Filter:** All Categories, Web Development, Data Science, Mobile Development, Marketing, Design
- **Level Filter:** All Levels, Beginner, Intermediate, Advanced

### Course Data Display
- **Course ID:** Shows customId (e.g., COURSE0001)
- **Course Info:** Shows thumbnail, title, and creation date
- **Instructor:** Shows instructor names (handles both string and object formats)
- **Category:** Shows as badge
- **Price:** Shows discount price or regular price with INR symbol
- **Students:** Shows total enrolled students across all batches
- **Status:** Shows current status with toggle switch
- **Rating:** Shows average rating or 0.0 if not rated
- **Actions:** View, Edit, Delete (soft delete)

### Status Management
- **Toggle Switch:** Toggles between published and archived
- **Visual Indicators:** Different badge colors for each status
- **Loading States:** Shows spinner during status updates

### Delete Functionality
- **Soft Delete:** Archives course (default)
- **Confirmation Modal:** Asks for confirmation before archiving
- **Safety Checks:** Backend prevents deletion of courses with enrolled students

## Testing Checklist

### Backend Requirements
- [ ] Course API should be accessible at `/courses`
- [ ] API should support query parameters: page, limit, status, category, level, search
- [ ] API should return data in format: `{ courses: [...], pagination: {...} }`
- [ ] Status update API should be available at `/courses/:id/status`
- [ ] Delete API should be available at `/courses/:id`

### Frontend Testing
- [ ] Page loads without errors
- [ ] Loading skeletons appear while fetching data
- [ ] Courses display correctly in table
- [ ] Search functionality works
- [ ] Status filter works
- [ ] Category filter works
- [ ] Level filter works
- [ ] Pagination works
- [ ] Status toggle works
- [ ] Delete functionality works
- [ ] Empty state shows when no courses found

## Troubleshooting

### Common Issues
1. **API not responding:** Check if backend server is running
2. **CORS errors:** Ensure backend CORS is configured for admin panel domain
3. **404 errors:** Check if routes are properly set up in backend
4. **Data not displaying:** Check if API response format matches expected structure

### Expected API Response Format
```json
{
  "success": true,
  "pagination": {
    "totalPages": 5,
    "page": 1,
    "limit": 10,
    "totalCourses": 47
  },
  "courses": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "customId": "COURSE0001",
      "title": "Complete Web Development Bootcamp",
      "thumbnail": "https://...",
      "category": "Web Development",
      "status": "published",
      "pricing": {
        "price": 29999,
        "discountPrice": 19999
      },
      "instructors": [
        {
          "name": "John Doe"
        }
      ],
      "batches": [
        {
          "students": ["id1", "id2"]
        }
      ],
      "averageRating": 4.5,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```
