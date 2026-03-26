# Contributing to Video Stream Platform

Thank you for your interest in contributing to the Video Stream Platform! We welcome contributions of all kinds, including bug reports, feature requests, documentation improvements, and code contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Git Workflow](#git-workflow)

## Code of Conduct

Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). All contributors are expected to uphold these standards and create a positive, inclusive environment.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Video-Stream-platform.git
   cd Video-Stream-platform
   ```
3. **Add upstream remote** to keep your fork updated:
   ```bash
   git remote add upstream https://github.com/original-owner/Video-Stream-platform.git
   ```

## Development Setup

### Prerequisites

- Node.js v18+ and npm
- Git
- A code editor (VS Code recommended)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then fill in the required environment variables.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Making Changes

### Creating a Feature Branch

Always create a new branch for your work:

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/description-of-feature
# or for bug fixes
git checkout -b fix/description-of-bug
```

Branch naming convention:
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation updates
- `refactor/` for code refactoring
- `test/` for test additions

### Code Style

#### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style in the project
- Use meaningful variable and function names
- Keep functions small and focused
- Use proper type annotations

#### React Components

- Use functional components with hooks
- Keep components focused on a single responsibility
- Use proper TypeScript types for props
- Include JSDoc comments for complex components

Example:
```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * Reusable button component
 * @param props - Button component props
 */
export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

#### Styling

- Use Tailwind CSS for styling
- Follow the mobile-first approach
- Avoid using `!important` in CSS
- Keep styles organized and reusable

### Commit Messages

Write clear, descriptive commit messages:

```
fix: correct button alignment on mobile

- Adjust flex-direction for mobile screens
- Update media query breakpoint
- Add test for mobile layout

Fixes #123
```

Format:
- Type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep the first line under 50 characters
- Provide detailed explanation in the body
- Reference issues using `Fixes #123` or `Closes #456`

## Submitting Changes

### Before Submitting

1. **Update your branch** with latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests:**
   ```bash
   npm run test
   ```

3. **Run linter:**
   ```bash
   npm run lint
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

### Creating a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - Clear title describing the change
   - Detailed description of what changed and why
   - Link to related issues using `Fixes #123`
   - Screenshots (if applicable)
   - Checklist of completed items

PR Title Format:
```
[Type] Brief description - max 72 characters
```

PR Description Template:
```markdown
## Description
Brief explanation of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Build successful
```

## Coding Standards

### TypeScript

- **Strict Mode:** Always enable strict TypeScript checking
- **Type Safety:** Avoid `any` type unless absolutely necessary
- **Interfaces:** Use interfaces for object shapes, types for unions
- **Naming:** Use camelCase for variables/functions, PascalCase for classes/components

### React Components

- Use functional components exclusively
- Prefer hooks over class methods
- Memoize expensive components with `React.memo` when appropriate
- Use custom hooks to share logic between components

### File Organization

```
src/
├── components/          # React components
├── actions/            # Server actions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── lib/                # Library integrations
├── constants/          # Constants and config
├── providers/          # Context providers
└── public/             # Static assets
```

## Testing

### Writing Tests

- Write tests for new features and bug fixes
- Aim for meaningful test coverage
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

Example:
```typescript
describe('Button Component', () => {
  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
npm run test              # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

## Documentation

### Code Comments

- Write comments for complex logic
- Use JSDoc for functions and components
- Keep comments up-to-date with code changes
- Avoid obvious comments

### README Updates

Update `README.md` for:
- New features
- Changed setup instructions
- New environment variables
- Updated dependencies

## Git Workflow

### Keep Updated with Upstream

Regularly sync your fork:
```bash
git fetch upstream
git rebase upstream/main
```

### Before Final Commit

```bash
# Update with latest changes
git fetch upstream
git rebase upstream/main

# Run full checks
npm run lint
npm run test
npm run build

# Push to your fork
git push origin feature/your-feature-name
```

## Reporting Issues

When reporting bugs:
- Check if the issue already exists
- Provide clear steps to reproduce
- Include expected vs actual behavior
- Add environment details (OS, browser, Node version)
- Include error messages and logs

Issue Template:
```markdown
## Description
Brief description of the issue

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Windows/Linux
- Node version: 18.x
- Browser: Chrome/Firefox/Safari

## Logs/Screenshots
Include relevant error messages or screenshots
```

## Need Help?

- Check existing issues and discussions
- Read the [README](README.md) for project overview
- Ask questions in GitHub Discussions
- Join our community chat for real-time help

## Acknowledgments

Thank you for contributing to the Video Stream Platform! Your work helps make this project better for everyone.

---

**Happy Contributing! 🚀**
